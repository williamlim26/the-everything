import { useEffect } from "react";

const Assistant: React.FC = () => {
  const getData = async () => {
    const result = await fetch("/api/assistance");
    const data = await result.json();
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl mt-5">
      <div className="space-y-5">
        <h1 className="text-5xl">Assistant</h1>
      </div>
    </div>
  );
};

// export const getServerSideProps = async () => {

// }

export default Assistant;
