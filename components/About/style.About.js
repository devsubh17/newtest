import styled from "styled-components";
export default styled.div`

.container{
        margin-top: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 82vh;
    
    }
    .Main{
        width: 90%;
        height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
    }
    .Main h4{
        font-size: 24px;
        text-align: center;

    }

    .Main p {
        font-size: 20px;
        text-align: center;
    }

    .contain{
        width: 85%;
    }
  @media only screen and (max-width: 768px) {
    .Main h4{
    font-size: 22px;
}
.Main p{
    font-size: 20px;
}
}

@media only screen and (max-width: 640px) and (min-width: 426px) {
.Main h4{
    font-size: 22px;
}
.Main p{
    font-size: 20px;
}
}
@media only screen and (max-width: 425px) {
.Main h4{
    font-size: 20px;
    margin-bottom: -5px;
}
.Main p{
    font-size: 16px;
}
}
`;