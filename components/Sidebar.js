import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline';
import {signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import useSpotify from '../hooks/useSpotify';
import {playlistIdState} from '../atoms/playlistAtom';
function Sidebar() {
  const {data: session, status} = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  console.log(session);
  const spotifyApi = useSpotify();
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(`you picked ${playlistId}`);

  return (
    <div
      className='text-gray-500 p-5 border-r 
    border-gray-900 overflow-y-scroll h-screen 
    scrollbar-hide text-xs lg:text-sm sm:max-w-[12rem] 
    lg:max-w-[15rem] hidden md:inline-flex pb-36'
    >
      <div className='space-y-4'>
        <button
          className='flex items-center space-x-2 hover:text-white'
          onClick={() => alert(process.env.NEXT_PUBLIC_CLIENT_ID)}
        >
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button
          className='flex items-center space-x-2 hover:text-white'
          onClick={() => alert(process.env.NEXT_PUBLIC_CLIENT_ID)}
        >
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          <p>Your Episode</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        {/* Playlists... */}
        {playlists.map(playlist => (
          <p
            onClick={() => setPlaylistId(playlist.id)}
            key={playlist.id}
            className='cursor-pointer hover:text-white'
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
