import { useState } from 'react';
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(firebase_app);

export default function MakeDonation() {
  const [perishableOrNot, setPerishableOrNot] = useState('');
  const [foodType, setType] = useState('');
  const [qty, setQty] = useState('');
  const [desc, setDesc] = useState('');
  const [picture, setPicture] = useState('');
  const [expDate, setExpDate] = useState('');
  const [notes, setNotes] = useState('');
  //const [state, setState] = useState('');
  //const [zip, setZip] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Set the data to the database reference
    set(ref(database, 'users/' + name), {
        perishableOrNot: perishableOrNot,
        foodType: foodType,
        qty: qty,
        desc: desc,
        picture: picture,
        expDate: expDate,
        notes: notes
    });

    // Clear input fields
    setPerishableOrNot('');
    setType('');
    setQty('');
    setDesc('');
    setPicture('');
    setExpDate('');
    setNotes('');
    //setState('');
    //setZip('');
  };
  return (
    <form onSubmit={handleSubmit}>  
    <label htmlFor="perishableOrNot">Please select from the following for your donation</label><br></br>
	<br></br>

      <input name = "perishableOrNot" type="radio" id="perishable" value={perishableOrNot} onChange={(event) => setPerishableOrNot(event.target.value)} /><label > Perishable</label>

      <input name = "perishableOrNot" type="radio" id="non-perishable" value={perishableOrNot} onChange={(event) => setPerishableOrNot(event.target.value)} /><label> Non-perishable</label>
      <br></br><br></br>	

	<select name="foodType" id="foodType" onChange={(event) => setType(event.target.value)}>
	  <option value ="BakedGoods">Baked Goods</option>
        <option value ="Dairy">Dairy</option>
        <option value ="PreparedMeals">Prepared Meals</option>
        <option value ="PreparedMealsVeg">Prepared Meals (Vegetarian)</option>
        <option value ="Produce">Produce</option>
        <option value ="Meat">Meat</option>
        <option value ="Beverages">Beverages</option>
	</select>

	 <label htmlFor="qty">Quantity</label><br></br>
      <input type="number" id="qty" value={qty} onChange={(event) => setQty(event.target.value)} /> lbs
      <br></br><br></br>

      <label htmlFor="desc">Food Description</label><br></br>
      <input type="text" id="desc" value={desc} onChange={(event) => setDesc(event.target.value)} />
      <br></br> <br></br>

      <label htmlFor="picture">Picture: </label><br></br>
      <input type="file" id="picture" value={picture} onChange={(event) => setPicture(event.target.value)} />
      <br></br><br></br>

       
	<label htmlFor="expDate">Expiration Date: </label><br></br>
      <input type="date" id="expDate" value={expDate} onChange={(event) => setExpDate(event.target.value)} />
      <br></br><br></br>

	<label htmlFor="notes">Special Requirements</label><br></br>
      <input type="text" id="notes" value={notes} onChange={(event) => setNotes(event.target.value)} />
      <br></br> <br></br>
            <button type="submit">Make Donation!</button>
	</form>
  );
}