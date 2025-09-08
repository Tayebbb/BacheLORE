
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../components/axios'
import Footer from '../components/Footer'

const UNIVERSITIES = [
  'Ahsanullah University of Science and Technology',
  'Bangladesh University of Engineering and Technology',
  'University of Dhaka',
  'Jahangirnagar University',
  'Khulna University of Engineering & Technology',
  'Chittagong University of Engineering & Technology',
  'Rajshahi University of Engineering & Technology',
  'Shahjalal University of Science and Technology',
  'North South University',
  'BRAC University',
  'East West University',
  'Islamic University of Technology',
  'United International University',
  'American International University-Bangladesh',
  'Bangladesh University of Professionals',
  'University of Chittagong',
  'University of Rajshahi',
  'Jagannath University',
  'Daffodil International University',
  'Independent University, Bangladesh'
];
const YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
const SEMESTERS = ['Spring', 'Summer', 'Fall', 'Winter'];

export default function Signup(){
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Live error states
  const [emailError, setEmailError] = useState('');
  const [eduEmailError, setEduEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [university, setUniversity] = useState(UNIVERSITIES[0]);
  const [year, setYear] = useState(YEARS[0]);
  const [semester, setSemester] = useState(SEMESTERS[0]);
  const [eduEmail, setEduEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if(!fullName || !email || !phone || !password || !confirmPassword || !university || !year || !semester || !eduEmail){
      setError('Please fill all fields')
      setStatus('error')
      return
    }
    if(emailError || eduEmailError || phoneError || passwordError){
      setError('Please fix the errors above')
      setStatus('error')
      return
    }
    if(password !== confirmPassword){
      setError('Passwords do not match')
      setStatus('error')
      return
    }
    // Password strength check (same as backend)
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!strongPassword.test(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.')
      setStatus('error')
      return
    }

    setStatus('loading')
    try{
      const { data } = await axios.post('/api/signup', {
        fullName,
        email,
        phone,
        password,
        university,
        year,
        semester,
        eduEmail
      })
      // backend returns { msg, user }
      if(data && data.user){
        setStatus('success')
        setError('')
      } else if(data && data.msg){
        setStatus('success')
        setError('')
      } else {
        setStatus('error')
        setError('Unexpected server response')
      }
    }catch(err){
      console.error('Signup error (page):', err)
      const msg = err?.response?.data?.msg || err?.response?.data?.error || err.message || 'Signup failed'
      setError(msg)
      setStatus('error')
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'#f8f9ff'}}>
      <main style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',width:'100vw',padding:'0',margin:'0'}}>
        <div style={{width:'100%',maxWidth:'900px',background:'#fff',borderRadius:'18px',boxShadow:'0 4px 32px rgba(0,0,0,0.08)',padding:'2.5rem 2rem',margin:'2rem 0',display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <h3 className="mb-3" style={{textAlign:'center'}}>Create an account</h3>
          <p className="muted" style={{textAlign:'center'}}>Sign up to access roommate tools, marketplace, and more.</p>
          <form onSubmit={submit} className="mt-3">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small">Full name</label>
                <input className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Email</label>
                <input type="email" className="form-control" value={email} onChange={e => {
                  setEmail(e.target.value);
                  // Live email validation
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailPattern.test(e.target.value)) {
                    setEmailError('Please enter a valid email address.');
                  } else {
                    setEmailError('');
                  }
                }} />
                {email && emailError && (
                  <div className="form-error-msg"><span>⚠️</span> {emailError}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label small">University</label>
                <select className="form-select" value={university} onChange={e => setUniversity(e.target.value)}>
                  {UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small">Year</label>
                <select className="form-select" value={year} onChange={e => setYear(e.target.value)}>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small">Semester</label>
                <select className="form-select" value={semester} onChange={e => setSemester(e.target.value)}>
                  {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small">Educational Email</label>
                <input type="email" className="form-control" value={eduEmail} onChange={e => {
                  setEduEmail(e.target.value);
                  // Live edu email validation
                  const eduEmailPattern = /@(.*\.)?(edu|ac)(\.[a-z]{2,})?$/i;
                  if (!eduEmailPattern.test(e.target.value)) {
                    setEduEmailError('Please enter a valid educational email address.');
                  } else {
                    setEduEmailError('');
                  }
                }} placeholder="yourname@university.edu.bd" />
                {eduEmail && eduEmailError && (
                  <div className="form-error-msg"><span>🎓</span> {eduEmailError}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label small">Phone Number</label>
                <input type="tel" className="form-control" value={phone} onChange={e => {
                  setPhone(e.target.value);
                  // Live phone validation: 11 digits, starts with 01
                  const phonePattern = /^01\d{9}$/;
                  if (!phonePattern.test(e.target.value)) {
                    setPhoneError('Phone must be 11 digits and start with 01.');
                  } else {
                    setPhoneError('');
                  }
                }} placeholder="01XXXXXXXXX" />
                {phone && phoneError && (
                  <div className="form-error-msg"><span>📱</span> {phoneError}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label small">Password</label>
                <input type="password" className="form-control" value={password} onChange={e => {
                  setPassword(e.target.value);
                  // Live password strength check
                  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
                  if (!strongPassword.test(e.target.value)) {
                    setPasswordError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
                  } else {
                    setPasswordError('');
                  }
                }} />
                {password && passwordError && (
                  <div className="form-error-msg"><span>🔒</span> {passwordError}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label small">Confirm password</label>
                <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center mt-4">
              <button className="btn hero-cta" type="submit" disabled={status==='loading'} style={{minWidth:'160px'}}>
                {status === 'loading' ? 'Creating...' : 'Create account'}
              </button>
              <Link to="/login" className="muted small d-flex align-items-center ms-2">Already have an account?</Link>
            </div>
            {status === 'success' && (
              <div className="alert alert-success mt-3">Account created — you can now login.</div>
            )}
            {status === 'error' && (
              <div className="alert alert-danger mt-3">{error || 'Signup failed'}</div>
            )}

          </form>
        </div>
      </main>
    </div>
  )
}
