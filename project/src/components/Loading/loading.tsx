type LoadingProps = {
  caller? : string;
}

const Loading = ({caller = ''} : LoadingProps) : JSX.Element => (
  <h1>{`Loading${caller}...`}</h1>
);

export default Loading;
