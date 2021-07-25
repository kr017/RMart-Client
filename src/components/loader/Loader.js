import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

const override = css`
  display : block
`;

const Loader  = ({loading})=>{
  return (
      <div style={{position:"absolute" ,left:"0px",right:"0px",top:"400px"}}>
      <PropagateLoader loading={loading} css={override} color="lightseagreen"/>
      </div>
  )
}

export default Loader