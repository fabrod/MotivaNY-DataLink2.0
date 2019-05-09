import styled from '@emotion/styled/macro';

const PageMain = styled.div({
  width: '100%',
  height: '100vh',
  color: 'white',
  overflow: 'hidden !important',
  position: 'relative',
  zIndex: '3',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const LoginForm = styled.div`
  margin-right: 3rem;
  padding: 2rem;
  font-family: 'Source Sans Pro', sans-serif;
  border-radius: 1rem;
  background-color: white;
  color: black;
  font-size: 1.2rem;

  a {
    text-decoration: none;
    color: #3895d3;
  }

  p:first-of-type {
    font-size: 2rem;
    font-weight: 300;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    font-size: 0.8rem;
  }
`;
const FormBottom = styled.p`
  padding: 2rem;
`;

const InfoBox = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.5rem;
  width: 50vw;
  h1 {
    font-weight: 700;
  }

  p:first-of-type {
    font-weight: 400;
    margin-top: 1em;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
export {PageMain, LoginForm, FormBottom, InfoBox};
