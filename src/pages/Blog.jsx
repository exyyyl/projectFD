import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, Typography, Card, CardMedia, CardContent, CircularProgress, Box, Button, Tooltip, IconButton, Fade,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import cheerio from 'cheerio';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles/globalStyles.css';

const BlogContainer = styled('div')({
  padding: '20px',
  color: 'white',
  height: 'calc(100vh - 150px)', // Уменьшение высоты
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#181818', // Темный фон
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  marginBottom: '30px', // Отступ снизу
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  padding: '10px 20px',
  position: 'sticky',
  top: 0,
  backgroundColor: '#222', // Фон для заголовка
  borderRadius: '15px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Тень для заголовка
  zIndex: 1000,
});

const Title = styled(Typography)({
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#FFF', // Цвет текста
  marginRight: '10px',
});

const BetaLabel = styled(Button)({
  borderColor: 'rgba(255, 255, 255, 0.5)',
  color: 'white',
  borderRadius: '15px',
  padding: '5px 10px',
  fontWeight: 'bold',
  fontSize: '14px',
  borderWidth: '2px',
  '&:hover': {
    borderColor: 'white',
  },
  marginLeft: '10px',
});

const TooltipContent = styled(Box)({
  padding: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: '10px',
  color: 'white',
  maxWidth: '220px',
  textAlign: 'center',
});

const NewsCard = styled(Card)({
  width: '360px', // Уменьшенная ширина карточек
  height: '280px', // Уменьшенная высота
  margin: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '15px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Легкая тень
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
  backgroundColor: '#252525', // Темный фон карточек
});

const NewsCardMedia = styled(CardMedia)({
  height: '160px',
  borderRadius: '15px 15px 0 0',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const NewsTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#FFF', // Цвет текста
});

const NewsCardContent = styled(CardContent)({
  padding: '10px',
  textAlign: 'center', // Центрированный текст
});

const NewsContainer = styled('div')({
  flexGrow: 1,
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '20px',
  padding: '0 20px',
});

const Blog = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedNews, setLoadedNews] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll'); // Добавление класса для body
    return () => {
      document.body.classList.remove('no-scroll'); // Удаление класса при размонтировании
    };
  }, []);

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    if (storedNews) {
      setNews(JSON.parse(storedNews));
      setLoading(false);
    } else {
      fetchNews();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (news.length > loadedNews.length) {
        setLoadedNews((prevLoadedNews) => [
          ...prevLoadedNews,
          news[prevLoadedNews.length],
        ]);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [news, loadedNews]);

  const fetchNews = async () => {
    setLoading(true);
    setFetching(true);
    try {
      const response = await axios.get('http://localhost:5000/api/news');
      const newsWithImages = await Promise.all(
        response.data.newsitems.map(async (item) => {
          const imageUrl = await extractImageUrl(item);
          return { ...item, imageUrl };
        })
      );
      setNews(newsWithImages);
      localStorage.setItem('news', JSON.stringify(newsWithImages));
    } catch (error) {
      console.error('Ошибка при загрузке новостей:', error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const fetchImageUrl = async (newsUrl) => {
    if (!newsUrl.startsWith('http')) {
      newsUrl = 'https://' + newsUrl;
    }
    try {
      const response = await axios.get(newsUrl);
      const $ = cheerio.load(response.data);
      const metaImage = $('meta[property="og:image"], meta[name="twitter:image"]').first();
      let imageUrl = metaImage.attr('content');

      if (!imageUrl) {
        const imageElement = $('img[src~="\\.(jpg|png)"]').first((_, img) => {
          const width = $(img).attr('width') || 0;
          const height = $(img).attr('height') || 0;
          return width > 100 && height > 100;
        });
        imageUrl = imageElement.attr('src');
      }

      if (!imageUrl || imageUrl === 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/capsule_184x69.jpg') {
        imageUrl = 'https://clan.akamai.steamstatic.com/images/37002678/2114e68607214c7dd5a5d23bd282b355f95eb223.png';
      }

      return imageUrl;
    } catch (error) {
      console.error('Failed to fetch image URL', error);
      return 'https://clan.akamai.steamstatic.com/images/37002678/2114e68607214c7dd5a5d23bd282b355f95eb223.png';
    }
  };

  const extractImageUrl = async (item) => {
    if (item.description) {
      const descriptionRegex = /<img[^>]+src="([^">]+)"/;
      const descriptionMatch = item.description.match(descriptionRegex);
      if (descriptionMatch) {
        return descriptionMatch[1];
      }
    }

    if (item.enclosure && item.enclosure.url) {
      return item.enclosure.url;
    }

    return await fetchImageUrl(item.url);
  };

  return (
    <BlogContainer>
      <Header>
        <Title>Новости игры</Title>
        <Tooltip
          title={
            <TooltipContent>
              <Typography variant="h6" component="h2">
                BETA
              </Typography>
              <Typography variant="body2">
                Эта страница находится в разработке. Некоторые функции могут быть недоступны или работать некорректно.
              </Typography>
            </TooltipContent>
          }
          placement="right"
          arrow
        >
          <BetaLabel variant="outlined">BETA</BetaLabel>
        </Tooltip>
        <IconButton color="primary" onClick={fetchNews} style={{ marginLeft: '10px' }}>
          <RefreshIcon />
        </IconButton>
      </Header>
      {loading ? (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
          {fetching && (
            <Typography variant="body2" color="white" marginTop="10px">
              Загрузка новостей {loadedNews.length}/{news.length}
            </Typography>
          )}
        </Box>
      ) : (
        <NewsContainer>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <Grid container spacing={2} justifyContent="center">
              {loadedNews.map((item) => (
                <Grid item key={item.gid}>
                  <Link to={`/patchnote/${item.gid}`} style={{ textDecoration: 'none' }}>
                    <Fade in={true} timeout={1000}>
                      <NewsCard>
                        <NewsCardMedia
                          component="img"
                          image={item.imageUrl}
                          alt="News"
                        />
                        <NewsCardContent>
                          <NewsTitle>{item.title}</NewsTitle>
                          <Typography variant="body2" color="textSecondary">
                            {item.pubDate}
                          </Typography>
                        </NewsCardContent>
                      </NewsCard>
                    </Fade>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </PerfectScrollbar>
        </NewsContainer>
      )}
    </BlogContainer>
  );
};

export default Blog;
