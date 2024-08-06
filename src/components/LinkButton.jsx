import "../css/componenets/LinkButton.css";

export default function LinkButton({ text, href }) {
  return (
    <a className="link-button" href={href} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
}
