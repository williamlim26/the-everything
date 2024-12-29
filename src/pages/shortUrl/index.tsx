import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Table from "@/components/Table";
import { nanoid } from "nanoid";

interface Props {
  title: string;
}

interface Url {
  id?: string;
  LongUrl: string;
  ShortUrl: string;
  length?: number;
}

/**
 * Simple Short URL
 *
 */
const ShortUrl: React.FC<Props> = ({ title }) => {
  const [longUrl, setLongUrl] = useState("");
  const [urls, setURLs] = useState<Url[]>([]);

  const addItemToTable = async (newURL: Url) => {
    const response = await fetch("/api/aws/putItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newURL),
    });

    return response.json();
  };

  const handleSubmit = async () => {
    try {
      const newURL = { LongUrl: longUrl, ShortUrl: nanoid(8) };
      setURLs([...urls, newURL]);
      const response = await addItemToTable(newURL);
      console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLongURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  //  const readItemsFromTable = async () => {
  //    const response = await fetch('/api/aws/batchGetItem', {
  //      method: 'GET',
  //    })
  //    return response.json()
  //  }
  //  useEffect(() => {
  //    const fetchData = async () => {
  //      const response = await readItemsFromTable()
  //   console.log('Successfully BatchGetCommand items:', response)
  //      setURLs(response.Responses.Testing1)
  //    }
  //    fetchData()
  //  }, [])

  const fetchItemsFromTable = async () => {
    // const response = await fetch('/api/aws/fetchItems?id=newDay&shortUrl=newDay', {
    //   method: 'GET',
    // })
    const response = await fetch("/api/aws/fetchItems", {
      method: "GET",
    });

    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchItemsFromTable();

      setURLs(response.Items);
    };
    fetchData();
  }, []);

  // const handleURLSearch = () => {
  //   const response =
  // }

  return (
    <div className='mx-auto max-w-screen-xl mt-5'>
      <div className='pt-6 pb-6'>
        <h1 className='text-5xl'>{title}</h1>
      </div>
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center space-x-2'>
          <label className='text-2xl'>Enter Long URL: </label>
          <input
            name='myInput'
            className='border border-gray-300 rounded-lg p-2 text-gray-900'
            type='text'
            placeholder='URL'
            onChange={handleLongURLChange}
          />
        </div>
        <Button buttonText='Create Short Url' onClick={handleSubmit} />
      </div>
      <div className='pt-5'>
        <Table title='cool' content={urls} />
      </div>
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center space-x-2'>
          <label className='text-2xl'>Enter Short URL: </label>
          <input
            name='myInput'
            className='border border-gray-300 rounded-lg p-2 text-gray-900'
            type='text'
            placeholder='URL'
            onChange={handleLongURLChange}
          />
        </div>
        <Button buttonText='Find URL' onClick={handleSubmit} />
      </div>
    </div>
  )
};

export const getServerSideProps = async () => {
  return {
    props: {
      title: "Short Url",
    },
  };
};

export default ShortUrl;
