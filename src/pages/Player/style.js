import styled from 'styled-components';
import bg from 'assets/bg-8.jpg';

const PlayerWrapper = styled.div`
  background: url(${bg}) no-repeat bottom;
  background-size: cover;
  height: 100vh;
  display: grid;
  place-items: center;

  & > div {
    height: 220px;
    width: 82vw;
    background: black;
    padding: 18px 22px 20px;
    border-radius: 4px;
    display: flex;
    @media only screen and (max-width: 1000px) {
      width: 90vw;
    }
    @media only screen and (max-width: 750px) {
      width: 82vw;
      flex-direction: column;
      height: max-content;
    }

    & > img {
      border-radius: 6px;
      width: 22%;
      object-fit: cover;
      @media only screen and (max-width: 750px) {
        width: 100%;
      }
    }

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 0 5px 18px;
      width: calc(78% - 18px);
      @media only screen and (max-width: 750px) {
        width: 100%;
        padding: 25px 0 5px;
      }

      .title {
        font-size: 30px;
        font-weight: 600;
        @media only screen and (max-width: 430px) {
          font-size: 25px;
        }
      }

      .wave {
        overflow-x: auto;
        padding-inline: 10px;
        @media only screen and (max-width: 750px) {
          margin: 50px 0;
        }
      }

      .controls {
        display: flex;
        align-items: center;

        svg {
          cursor: pointer;
          width: 25px;
          height: 25px;
          pointer-events: ${({ showZoom }) => (showZoom ? 'all' : 'none')};
          path {
            fill: ${({ showZoom }) => (showZoom ? 'white' : 'gray')} !important;
          }

          &.stop {
            margin-left: 12px;
          }

          &.zoomOut,
          &.zoomIn {
            width: 22px;
            height: 22px;
          }

          &.zoomOut {
            transform: rotateY(180deg);
            margin-left: auto;
          }

          &.zoomIn {
            margin-left: 27px;
            margin-right: auto;
          }
        }

        span {
          &:last-of-type {
            font-size: 20px;
            width: 103px;
            text-align: right;
          }
        }
      }
    }
  }
`;

export default PlayerWrapper;
