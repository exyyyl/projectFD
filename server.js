const express = require('express');
const axios = require('axios');
const cors = require('cors');
const xml2js = require('xml2js');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/', {
      params: {
        appid: '739630',
        count: 1000,
      },
    });

    const filteredNews = response.data.appnews.newsitems.filter(
      (item) => item.feedname === 'steam_community_announcements'
    );

    res.json({ newsitems: filteredNews });
  } catch (error) {
    console.error('Ошибка при загрузке новостей:', error);
    res.status(500).json({ error: 'Ошибка при загрузке новостей' });
  }
});

app.get('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  const rssUrl = 'https://store.steampowered.com/news/app/739630/rss';

  try {
    const response = await axios.get(rssUrl, { timeout: 10000 });
    let xml = response.data;

    // Очистка XML (можно добавить больше правил)
    xml = xml.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');
    xml = fixXml(xml); // Применяем функцию очистки

    xml2js.parseString(xml, { explicitArray: false, trim: true }, (err, result) => {
      if (err) {
        console.error('Ошибка при парсинге RSS:', err);
        return res.status(500).json({ error: 'Ошибка при парсинге RSS' });
      }

      try {
        const items = result.rss.channel.item;
        const article = items.find(item => item.guid === `https://store.steampowered.com/news/app/739630/view/${id}`);
        
        if (article) {
          // Возвращаем содержимое статьи
          const content = {
            title: article.title,
            description: article.description
          };
          res.json(content);
        } else {
          res.status(404).json({ error: 'Патчноут не найден' });
        }
      } catch (error) {
        console.error('Ошибка при обработке данных статьи:', error);
        res.status(500).json({ error: 'Ошибка при обработке данных статьи' });
      }
    });
  } catch (error) {
    console.error('Ошибка при загрузке RSS:', error);
    res.status(500).json({ error: 'Ошибка при загрузке RSS' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
