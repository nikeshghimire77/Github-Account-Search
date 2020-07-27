import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company,
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>
                <p>{bio}</p>
              </h3>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark btn-block my-1'>
            Visit github profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: {login}</strong>
                </Fragment>
              )}
            </li>

            <li>
              {company && (
                <Fragment>
                  <strong>Company: {company}</strong>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
