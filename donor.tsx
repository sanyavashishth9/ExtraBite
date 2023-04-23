import { useState } from 'react';
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import Image from 'next/image';
import Link from 'next/link';

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

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Set the data to the database reference
    set(ref(database, 'users/' + name), {
        email: email,
        password: password,
        phone: phone,
        status: address,
        city: city,
        state: state,
        zip: zip
    });

    // Clear input fields
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setStatus('');
    setAddress('');
    setCity('');
    setState('');
    setZip('');

  };

  return (
    <div className="grid-element">
    <Image
      src="/LandingPage.png"
      width="720"
      height="750"
      alt = "pic"
    />
    <div className='signupform'>
        <style jsx>{`
        div {
            position: absolute;
            width: 50vw;
            height: 53vw;
            left: 720px;
            top: -2px;
            background: #D3504B;
            padding-top: 70px;
        }
        label {
            color: white;
        }
        form {
            text-align: center;
        }
        input {
            border-radius: 10px;
        }
        button {
            color: white;
        }
        select {
            margin-right: 1em;
        }
        #zip {
            width: 70px;
        }
      `}</style>
        <form onSubmit={handleSubmit}>  
        <label htmlFor="name">Name of Organization</label><br></br>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        <br></br><br></br>
        <label htmlFor="email">Email</label><br></br>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br></br> <br></br>
        <label htmlFor="password">Password</label><br></br>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br></br><br></br>
        <label htmlFor="phone">Phone Number</label><br></br>
        <input type="text" id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
        <br></br><br></br>
        <label htmlFor="status">Donor or Receiver</label><br></br>
        <input name = "status" type="radio" id="donor" value={status} onChange={(event) => setStatus(event.target.value)} /><label > Donor</label>
        <input name = "status" type="radio" id="receiver" value={status} onChange={(event) => setStatus(event.target.value)} /><label> Receiver</label>
        <br></br><br></br>
        <label htmlFor="address">Street Address</label><br></br>
        <input type="text" id="address" value={address} onChange={(event) => setAddress(event.target.value)} />
        <br></br><br></br>
        <label htmlFor="city">City</label><br></br>
        <input type="text" id="city" value={city} onChange={(event) => setCity(event.target.value)} />
        <br></br><br></br>
        
        <select name="state" id="State" onChange={(event) => setState(event.target.value)}>
            <option value ="AL">AL</option>
            <option value ="AK">AK</option>
            <option value ="AZ">AZ</option>
            <option value ="AR">AR</option>
            <option value ="CA">CA</option>
            <option value ="CO">CO</option>
            <option value ="CT">CT</option>
            <option value ="DE">DE</option>
            <option value ="FL">FL</option>
            <option value ="GA">GA</option>
            <option value ="HI">HI</option>
            <option value ="ID">ID</option>
            <option value ="IL">IL</option>
            <option value ="IN">IN</option>
            <option value ="IA">IA</option>
            <option value ="KS">KS</option>
            <option value ="KY">KY</option>
            <option value ="LA">LA</option>
            <option value ="ME">ME</option>
            <option value ="MD">MD</option>
            <option value ="MA">MA</option>
            <option value ="MI">MI</option>
            <option value ="MN">MN</option>
            <option value ="MS">MS</option>
            <option value ="MO">MO</option>
            <option value ="MT">MT</option>
            <option value ="NE">NE</option>
            <option value ="NV">NV</option>
            <option value ="NH">NH</option>
            <option value ="NJ">NJ</option>
            <option value ="NM">NM</option>
            <option value ="NY">NY</option>
            <option value ="NC">NC</option>
            <option value ="ND">ND</option>
            <option value ="OH">OH</option>
            <option value ="OK">OK</option>
            <option value ="OR">OR</option>
            <option value ="PA">PA</option>
            <option value ="RI">RI</option>
            <option value ="SC">SC</option>
            <option value ="SD">SD</option>
            <option value ="TN">TN</option>
            <option value ="TX">TX</option>
            <option value ="UT">UT</option>
            <option value ="VT">VT</option>
            <option value ="VA">VA</option>
            <option value ="WA">WA</option>
            <option value ="WV">WV</option>
            <option value ="WI">WI</option>
            <option value ="WY">WY</option>
        </select>

        <label htmlFor="zip">Zip Code</label>
        <input type="text" id="zip" value={zip} onChange={(event) => setZip(event.target.value)} />
        <br></br><br></br>
        <Link href = "/donorForm">
            <button type="submit">Sign Up</button>
        </Link>
        </form>
    </div>
    </div>
  );
}
