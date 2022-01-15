import {useSession, signIn} from 'next-auth/react';
import {useEffect} from 'react';
// import SpotifyWebApi from 'spotify-web-api-node';
import spotifyApi from '../lib/spotify';

function useSpotify() {
  const {data: session, status} = useSession();
  useEffect(() => {
    if (session) {
      // If refresh acces token fails redirect to login
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);
  return spotifyApi;
}

export default useSpotify;
