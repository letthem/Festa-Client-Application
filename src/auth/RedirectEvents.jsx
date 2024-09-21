import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocationErrorBox, DuplicationErrorBox } from '@/components/event/ErrorContainer';
import { axiosInstance } from '@/api/axios';
import EventPage from '@/pages/event/main/EventPage';
import styled from 'styled-components';

const RedirectEvents = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  localStorage.setItem('kakao_code', code);

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [errorStatus, setErrorStatus] = useState(null);
  const navigate = useNavigate();

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      setLocation({ latitude: latitude, longitude: longitude });
    });
  };

  const getEventToken = async () => {
    try {
      const response = await axiosInstance.post('/entries/token', {
        code: localStorage.getItem('kakao_code'),
        latitude: location.latitude,
        longtitude: location.longitude,
      });
      console.log(response.data.message);
      localStorage.setItem('event_access_token', response.data.data.accessToken);
      navigate('/event/enter');
    } catch (error) {
      localStorage.removeItem('kakao_code');

      if (error.response.status === 400) {
        console.log('요청 양식 불량');
        window.location.href = '/event';
      } else if (error.response.status === 401) {
        console.log('일반 사용자 인증 실패');
        window.location.href = '/event';
      } else if (error.response.status === 403) {
        console.log('위치 확인 실패');
        setErrorStatus(403);
      } else if (error.response.status === 409) {
        console.log('중복 응모');
        setErrorStatus(409);
      } else {
        console.log('알 수 없는 오류');
      }
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      getEventToken();
    }
  }, [location]);

  useEffect(() => {
    if (errorStatus) {
      // 에러가 발생했을 때 body의 스크롤 방지
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [errorStatus]);

  return (
    <>
      <EventPage />
      {errorStatus && (
        <Wrapper>
          {errorStatus === 403 && <LocationErrorBox />}
          {errorStatus === 409 && <DuplicationErrorBox />}
        </Wrapper>
      )}
    </>
  );
};

export default RedirectEvents;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  touch-action: none;
`;
