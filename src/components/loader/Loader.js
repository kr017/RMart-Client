import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";
import './loader.css' 

const override = css`
  display : block
`;

const Loader  = ({loading})=>{
  return (
      <div className="loader" >
      <PropagateLoader loading={loading} css={override} color="lightseagreen"/>
      </div>
  )
}

export default Loader