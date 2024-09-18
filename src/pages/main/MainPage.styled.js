import { styled, css, keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70.7rem;
`;

export const LottieWrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  width: 37.5rem;
  height: 70.7rem;
  z-index: 0;
`;

export const Title = styled.div`
  position: absolute;
  top: 9.4rem;
  z-index: 1;
  display: flex;
  color: ${(props) => props.theme.colors.white};
  font-family: 'SCoreDream', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  line-height: 6rem;
  letter-spacing: -0.004rem;
  text-align: center;
  opacity: ${(props) => (props.$showContent ? '1' : '0')};
  transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
`;

export const Desc = styled.div`
  position: absolute;
  top: 27rem;
  ${(props) => props.theme.fontStyles.basic.subHeadMed};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  z-index: 1;
  opacity: ${(props) => (props.$showContent ? '1' : '0')};
  transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
`;

export const Img = styled.img`
  width: 37.8rem;
  height: 42.3rem;
  object-fit: contain;
`;

export const LineupTitleWrapper = styled.div`
  width: 100%;
  height: 7.7rem;
  margin-top: 3.2rem;
  margin-bottom: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Date = styled.p`
  ${(props) => props.theme.fontStyles.basic.subHeadBold}
  color: ${(props) => props.theme.colors.gray10};
  text-align: center;
`;

export const LineupTitle = styled.p`
  ${(props) => props.theme.fontStyles.main.headline3}
  text-align: center;
`;

export const LineupInfoWrapper = styled.div`
  width: 33.5rem;
  height: 50.9rem;
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 1.2rem;
  border: 1px solid black;
`;

export const GoLineupPageBtn = styled.button`
  margin-top: 3.2rem;
  width: 33.5rem;
  height: 5.4rem;
  box-shadow: 0px 0px 0.8rem 0 rgba(0, 0, 0, 0.12);
  ${(props) => props.theme.fontStyles.basic.headline5}
  margin-bottom: 6.4rem;
`;

export const Hr = styled.div`
  width: 100%;
  height: 1.2rem;
  background-color: rgba(160, 227, 255, 0.5);
`;
