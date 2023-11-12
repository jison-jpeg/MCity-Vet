import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import the Google logo icon

import { GoogleAuthProvider, signInWithPopup, getAuth } from '@firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/backend/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            console.log(data);
            dispatch(signinSuccess(data));
            navigate('/dashboard');
            
        } catch (error) {
            console.log('could not login with google', error);
        }
    };

    return (
        <button type="button" onClick={handleGoogleClick} className="btn btn-form btn-primary-color">
            <span> <FontAwesomeIcon icon={faGoogle} className='google-icon' /> Continue with Google</span>
        </button>
    )
}
