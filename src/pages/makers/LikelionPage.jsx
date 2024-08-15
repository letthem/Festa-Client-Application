<<<<<<< HEAD
import styled from 'styled-components';
import likelionBgImg from '@/static/image/makers/likelionBgImg.svg';
=======
import styled, { css } from 'styled-components';
<<<<<<< HEAD
import likelionBgImg from '@/assets/svgs/makers/likelionBgImg.svg';
>>>>>>> abea1b2 ([Feat] 짝수, 홀수 따라 grid 변경)
=======
import likelionBgImg from '@/assets/webps/makers/likelionBgImg.webp';
>>>>>>> 9f489da ([Fix] svg -> webp로 변경)
import LikelionCard from './LikelionCard';
import { useTranslation } from 'react-i18next';
import { contributors } from './LikelionContributors';
import Footer from '@/components/layouts/Footer';

const LikelionPage = () => {
  const { t } = useTranslation();
  const contributorsData = contributors(t);

  const pm = contributorsData.pm;
  const plan = contributorsData.plan;
  const design = contributorsData.design;
  const frontend = contributorsData.frontend;
  const backend = contributorsData.backend;

  return (
    <LikelionLayout>
      <LikelionBgImg>
        <Title>
          {t('likelion.title1')}
          <br />
          {t('likelion.title2')}
        </Title>
      </LikelionBgImg>
      <WhoWeAreBg>
        <WhoWeAre>
          {t('likelion.whoWeAre1')}
          <br />
          {t('likelion.whoWeAre2')}
          <br />
          <br />
          {t('likelion.whoWeAre3')}
          <br />
          {t('likelion.whoWeAre4')}
          <br />
          <br />
          {t('likelion.whoWeAre5')}
          <br />
          {t('likelion.whoWeAre6')}
          <br />
          {t('likelion.whoWeAre7')}
          <br />
          {t('likelion.whoWeAre8')}
          <br />
          <br />
          {t('likelion.whoWeAre9')}
        </WhoWeAre>
        <Slogan> {t('likelion.slogan')}</Slogan>
      </WhoWeAreBg>
      <Devider />
      <RoleSection>
        <RoleName>{t('likelion.pm')}</RoleName>
        <RoleDescription>
          {t('likelion.pmDescription1')}
          <br />
          {t('likelion.pmDescription2')}
        </RoleDescription>
        <CardWrapper $cardCount={pm.length}>
          {contributorsData.pm.map((contributor, index) => (
            <LikelionCard key={index} {...contributor} />
          ))}
        </CardWrapper>
      </RoleSection>
      <Devider />
      <RoleSection>
        <RoleName>{t('likelion.plan')}</RoleName>
        <RoleDescription>
          {t('likelion.planDescription1')}
          <br />
          {t('likelion.planDescription2')}
        </RoleDescription>
        <CardWrapper $cardCount={plan.length}>
          {contributorsData.plan.map((contributor, index) => (
            <LikelionCard key={index} {...contributor} />
          ))}
        </CardWrapper>
      </RoleSection>
      <Devider />
      <RoleSection>
        <RoleName>{t('likelion.design')}</RoleName>
        <RoleDescription>
          {t('likelion.designDescription1')}
          <br />
          {t('likelion.designDescription2')}
        </RoleDescription>
        <CardWrapper $cardCount={design.length}>
          {contributorsData.design.map((contributor, index) => (
            <LikelionCard key={index} {...contributor} />
          ))}
        </CardWrapper>
      </RoleSection>
      <Devider />
      <RoleSection>
        <RoleName>{t('likelion.fe')}</RoleName>
        <RoleDescription>
          {t('likelion.feDescription1')}
          <br />
          {t('likelion.feDescription2')}
          <br />
          {t('likelion.feDescription3')}
        </RoleDescription>
        <CardWrapper $cardCount={frontend.length}>
          {contributorsData.frontend.map((contributor, index) => (
            <LikelionCard key={index} {...contributor} />
          ))}
        </CardWrapper>
      </RoleSection>
      <Devider />
      <RoleSection>
        <RoleName>{t('likelion.be')}</RoleName>
        <RoleDescription>
          {t('likelion.beDescription1')}
          <br />
          {t('likelion.beDescription2')}
        </RoleDescription>
        <CardWrapper $cardCount={backend.length}>
          {contributorsData.backend.map((contributor, index) => (
            <LikelionCard key={index} {...contributor} />
          ))}
        </CardWrapper>
      </RoleSection>
      <Footer />
    </LikelionLayout>
  );
};

export default LikelionPage;

const LikelionLayout = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.makersBackgroundColor};
`;

const LikelionBgImg = styled.div`
  width: 100%;
  padding-bottom: 90%;
  margin: 0 auto;
  background: linear-gradient(180deg, rgba(18, 18, 18, 0.4) 0%, #121212 100%), url(${likelionBgImg});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  position: absolute;
  top: 45%;
  ${(props) => props.theme.fontStyles.basic.headline1};
  color: ${(props) => props.theme.colors.white};
`;

const WhoWeAreBg = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WhoWeAre = styled.div`
  position: absolute;
  margin-top: -0.3rem;
  ${(props) => props.theme.fontStyles.basic.body1Med};
  color: ${(props) => props.theme.colors.white};
`;

const Slogan = styled.p`
  margin-top: 33.9rem;
  color: ${(props) => props.theme.colors.white};
  font-family: 'Inconsolata', san-serif;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.032rem;
  margin-bottom: 5.1rem;
`;

const Devider = styled.div`
  width: 100%;
  padding-bottom: 3.2%;
  background-color: ${(props) => props.theme.colors.gray100};
`;

const RoleSection = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const RoleName = styled.h3`
  margin-top: 3.6rem;
  ${(props) => props.theme.fontStyles.basic.headline3};
  color: ${(props) => props.theme.colors.white};
`;

const RoleDescription = styled.div`
  margin-top: 1.6rem;
  margin-bottom: 3.2rem;
  ${(props) => props.theme.fontStyles.basic.body1Med};
  color: ${(props) => props.theme.colors.gray40};
`;

const CardWrapper = styled.div`
  margin-bottom: 3.6rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4rem;
  row-gap: 2.8rem;
  ${({ $cardCount }) =>
    $cardCount % 2 === 1 &&
    css`
      & > *:nth-child(odd):first-of-type {
        grid-column: span 2;
        justify-self: center;
      }
    `}
`;
