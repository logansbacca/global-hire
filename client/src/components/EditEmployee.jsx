import { React, useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

export default function EditEmployee(props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(props.email);
  const [position, setPosition] = useState(props.position);
  
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleChange = (e,id) => {
      switch (id) {
        case 'name':
          setEmail(e.target.value)
          break;
        case 'position':
          setPosition(e.target.value)
          break;
        default: 
          console.log("no id available")
      }
  }

  let saveChanges = async () => {
    const id = props.id
    console.log(id)
    const updatedUser = {
      "firstName" : props.name,
      "lastName" :props.surname,
      "email" : email,
      "position" : position,
      "icon" : props.icon
    }

    const request = await fetch(`http://localhost:3333/api/workers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
    if (request.ok){
      const response = await request.json();
      console.log(response)
    }else {
      const error = await request.json()
      throw new Error (error.message)
    }


} 
    
  return (
    <>
      <div className="bg-red">
        <Button
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border  hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2  focus:ring-offset-2"
          onClick={openModal}
        >
          Edit
        </Button>

        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="rounded-md absolute top-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto bg-white border-2 border-black shadow-lg p-3">
            <form onSubmit={(e) => {
              e.preventDefault()
              saveChanges()
              closeModal() 
            }} className="w-full" id="edit-modal">
            <div className="flex  w-full ">
            <h1 className="mb-2 font-medium">Update Employee</h1>
            </div>
              <div className="flex flex-col items-center  border-t border-gray-300 pt-2">
                <div className="flex w-full mb-6 items-center">
                <div className="md:w-1/3 ">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="name" 
                  >
                   Email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="name"
                    placeholder={props.email}
                    type="text"
                    onChange={(e)=> handleChange(e,'name')}
                  />
                </div>
                </div>
                <div className="flex w-full mb-6 items-center ">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="position"
                  >
                    Position
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="position"
                    type="text"
                    placeholder={props.position}
                    onChange={(e)=> handleChange(e,'position')}
                  />
                </div>
                </div>
                <div className="flex justify-end space-x-2 ì w-full border-t border-gray-300 pt-4">
                  <Button size="small" type="submit" variant="outlined">
                    Confirm
                  </Button>
                  <Button onClick={closeModal} size="small" variant="outlined" color="error">
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}
