import { React, useState, useEffect } from 'react';
import Navbar from './Navbar';
import MCTable from './MCTable';
import Graphs from './Graphs';
import MCGraph from './MCGraph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faEdit,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import {
  BASEURL,
  POSTURL,
  GETURL,
  UPDATEURL,
  DELETEURL,
  GETMCURL,
} from './helper/apiEndpoints';
import { useAuth0 } from '@auth0/auth0-react';
import Notifications, { notify } from 'react-notify-toast';
import Modal from 'react-modal';
import Tables from './Tables';
import Username from './Username';

Modal.setAppElement('#root');

const Dashboard = () => {
  const { user } = useAuth0();
  const [addItem, setAddItem] = useState('');
  const [addQuan, setAddQuan] = useState('');
  const [presentItems, setPresentItems] = useState([]);
  const [mcItems, setMcItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingvalue, seteeditingvalue] = useState('');
  const [editingQuant, setEditingQuant] = useState('');
  const [oldvalue, setdoldvalue] = useState('');
  const [oldQuant, setOldQuant] = useState('');
  const [isloading, setIsloading] = useState(false);

  // function to fetch user data on load
  const initialFun = async () => {
    try {
      const id = user.sub;
      const response = await fetch(`${BASEURL}${GETURL}/${id}`);
      const data = await response.json();
      console.log(data);
      setPresentItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  // To fetch and display user data from file on load.
  useEffect(() => {
    initialFun();
  }, []);

  // to toggle update modal
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  // to update the existing values
  const updateitem = async () => {
    try {
      const data = await fetch(
        `${BASEURL}${UPDATEURL}/${user.sub}/${editingvalue}/${oldvalue}/${editingQuant}/${oldQuant}`
      );
      const json_data = await data.json();
      setPresentItems(json_data);
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMCFetch = async () => {
    try {
      setIsloading(true);
      const response = await fetch(`${BASEURL}${GETMCURL}/${user.sub}`);
      const data = await response.json();
      setMcItems(data);
      setIsloading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // to find the old data and new data to update and pass to update request
  const finddata = (e) => {
    seteeditingvalue(
      e.target.previousElementSibling.previousElementSibling.textContent
    );
    setdoldvalue(
      e.target.previousElementSibling.previousElementSibling.textContent
    );
    setEditingQuant(e.target.previousElementSibling.textContent);
    setOldQuant(e.target.previousElementSibling.textContent);

    toggleModal();
  };

  // delete request
  const deleteData = async (e) => {
    try {
      const val =
        e.target.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent;
      const quant =
        e.target.previousElementSibling.previousElementSibling.textContent;
      const response = await fetch(
        `${BASEURL}${DELETEURL}/${user.sub}/${val}/${quant}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setPresentItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  // adding the data from user inputs
  const handleAddition = async () => {
    if (addItem !== '' && addQuan !== '') {
      try {
        const id = user.sub;
        const data = { addItem: [addItem, addQuan], id };
        const response = await fetch(`${BASEURL}${POSTURL}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(data),
        });
        const json_data = await response.json();
        setPresentItems(json_data);
        console.log('Added');
      } catch (error) {
        console.log(error);
      }
      setAddItem('');
      setAddQuan('');
    }
  };

  return (
    <div>
      <Navbar />
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="text-center mb-2 text-xl font-semibold">Update</div>
        <input
          value={editingvalue}
          onChange={(e) => seteeditingvalue(e.target.value)}
          type="text"
          className="modalInput1"
        />
        <input
          type="number"
          value={editingQuant}
          onChange={(e) => setEditingQuant(e.target.value)}
          className="modalInput2"
        />
        <div className="flex justify-around">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded-md"
            onClick={updateitem}
          >
            Save
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded-md"
            onClick={toggleModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Username />
      <div className="flex flex-col md:flex-row m-2 p-2 items-center md:items-start justify-center md:justify-between mx-8">
        <div className="mb-5 md:ml-12">
          <div>
            {/* Empty input field */}
            <div>
              <input
                required
                value={addItem}
                onChange={(e) => {
                  setAddItem(e.target.value);
                }}
                type="text"
                placeholder="Stock Ticker"
                className="stockInput w-24 md:w-28 mr-2"
              />
              <input
                required
                value={addQuan}
                onChange={(e) => {
                  setAddQuan(e.target.value);
                }}
                type="number"
                min="1"
                placeholder="Qnt"
                className="stockQuant mr-2 md:mr-10 w-20 p-1"
              />
              <button
                onClick={handleAddition}
                className="md:mr-8 ring-2 ring-blue-400 px-3 rounded-md hover:bg-blue-400 hover:text-white py-1"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add
              </button>
            </div>
            {/* Input with users current data */}
            {presentItems.map((data) => (
              <div>
                <div className="inline-block mt-4 mr-8 w-28 md:w-52 uppercase">
                  {data[0]}
                </div>
                <div className="inline-block mt-4 mr-12 text-right">
                  {data[1]}
                </div>
                <button
                  onClick={(e) => finddata(e)}
                  className="mr-8 mt-4 md:mt-0 updateBtn"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Update
                </button>
                <button onClick={(e) => deleteData(e)} className="deleteBtn">
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Tables */}
        <div className="md:mr-12 flex flex-col justify-center">
          {/* Table with percentages of present values */}
          <Tables presentItems={presentItems} />
          {/* Monte carlo simulation only when there is more than single data */}
          {presentItems.length >= 2 && (
            <button
              className="bg-blue-500 rounded-md text-white px-3 py-1 my-8 text-center hover:opacity-80 focus:outline-none"
              onClick={handleMCFetch}
            >
              {isloading && (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-2" />{' '}
                  <span>Loading...</span>
                </>
              )}
              {!isloading && 'Monte Carlo'}
            </button>
          )}
          <MCTable dataItems={mcItems} />
        </div>
      </div>
      {mcItems.length > 0 && (
        <div className="text-center bg-gray-200 p-4">
          <div className="flex flex-col md:flex-row justify-around items-center">
            <Graphs presentItems={presentItems} />
            <MCGraph dataItems={mcItems} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
