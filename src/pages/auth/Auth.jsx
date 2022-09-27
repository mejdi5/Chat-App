import React, {useState, useEffect} from 'react'
import './Auth.scss'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../firebase'
import { storage, db } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 


const Auth = ({setLoading}) => {

    const [auth, setAuth] = useState("login")
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const [percentage, setPercentage] = useState(0)
    const [uploading, setUploading] = useState(null)
    const [error, setError] = useState(null)


    const handleDeleteImage = async () => {
        try {
        //delete image from firebase storage
        const desertRef = ref(storage, image);
        await deleteObject(desertRef)
        } catch (error) {
        console.log(error)
        }
        setImage(null)
    }

    
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        try {
            setLoading(false)
            const res = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            await updateProfile(res.user, {
                displayName: name,
                photoURL: file ? image : ""
            })
            await setDoc(doc(db, "users", res.user.uid), {
                name,
                email,
                image: file ? image : ""
            });
        } catch (err) {
            setLoading(false)
            setError(err.message)
            setTimeout(() => setError(null), 3000)
        }
    }

    useEffect(() => {
        const uploadImage = () => {
        const storageRef = ref(storage, file.name + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercentage(progress)
            switch (snapshot.state) {
                case 'paused': setUploading('Paused');
                break;
                case 'running': setUploading('Uploading');
                break;
            }
        }, 
        (error) => console.log(error), () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setImage(downloadURL)
            setPercentage(0)
            setUploading(null)
        })})
        }
        file && uploadImage()
    }, [file])


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        const email = e.target[0].value
        const password = e.target[1].value
        try {
            setLoading(false)
            await signInWithEmailAndPassword(firebaseAuth, email, password)
            navigate("/")
        } catch (err) {
            setLoading(false)
            setError(err.message)
            setTimeout(() => setError(null), 3000) 
        }
    }


return (
<div className="auth">
    <div className="wrapper">
        <div className="left">
            {auth === "login"
            ?
            <div className="leftContainer">
                <h1>Chat App</h1>
                <div className="leftWrapper">
                    <span>Haven't account yet ?</span>
                    <button onClick={() => setAuth('register')}>
                        Sign Up
                    </button>
                </div>
            </div>
            :
            <div className="leftContainer">
                <h1>Chat App</h1>
                <div className="leftWrapper">
                    <span>Already signed up ?</span>
                    <button onClick={() => setAuth('login')}>
                        Sign In
                    </button>
                </div>
            </div>
            }
        </div>
        <div className="right">
            {auth === "login"
            ?
            <div className='rightContainer'>
                <div className="formWrapper">
                    <h2>SIGN IN</h2>
                    <form onSubmit={handleLogin}>
                        <input
                        type="email"
                        placeholder="Email.."
                        name="email"
                        required
                        />
                        <input
                        type="password"
                        placeholder="Password.."
                        name="password"
                        required
                        />
                        {error && <span className='error'>{error}</span>}
                        <button>
                            Login
                        </button>
                    </form>
                </div>
            </div>
            :
            <div className='rightContainer'>
                <div className="formWrapper">
                    <h2>SIGN UP</h2>
                    <form onSubmit={handleRegister}>
                        <input
                        type="text"
                        placeholder="Name.."
                        name="name"
                        required
                        />
                        <input
                        type="email"
                        placeholder="Email.."
                        name="email"
                        required
                        />
                        <input
                        type="password"
                        placeholder="Password.."
                        name="password"
                        required
                        />
                        <input
                        className='file'
                        type="file"
                        id="file"
                        onChange={e => setFile(e.target.files[0])}
                        />
                        <label htmlFor='file'>
                            <img src="/image.jpg" alt=""/>
                            <span>Add Image</span>
                        </label>
                        <div className='uploadProgress'>
                            {uploading && <div className='uploading'>{uploading}</div>}
                            {percentage > 0 && !image && 
                            <div className='progress'>
                                <div style={{width: `${percentage}%`}} className='percentage'>{percentage.toFixed(0)}%</div>
                            </div>}
                            {image && <img src={image} alt="" onClick={handleDeleteImage}/>}
                        </div>
                        {error && <span className='error'>{error}</span>}
                        <button>
                            Register
                        </button>
                    </form>
                </div>
            </div>
            }
        </div>
    </div>
</div>
)}

export default Auth