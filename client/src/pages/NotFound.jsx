import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const location = useLocation()
  const navigate = useNavigate()
  const attemptedPath = location.pathname || '/'

  useEffect(() => {
    document.title = 'Page not found | Task Manager'
    return () => {
      document.title = 'Task Manager'
    }
  }, [])

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/')
  }

  return (
    <main className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__card">
        <img
          className="not-found__art"
          src="/notfound.jpg"
          alt=""
          role="presentation"
        />

        <div className="not-found__body">
          <h1 id="not-found-title">Page not found</h1>
          <p className="not-found__lead">
            This URL is not part of the Task Manager. Check the address, or go back to your tasks.
          </p>

          <p className="not-found__path">
            You tried to open
            <code>{attemptedPath}</code>
          </p>

          <div className="not-found__actions">
            <Link className="not-found__btn not-found__btn--primary" to="/">
              Back to tasks
            </Link>
            <button
              type="button"
              className="not-found__btn not-found__btn--secondary"
              onClick={handleGoBack}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFound
