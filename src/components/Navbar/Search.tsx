import React, { useEffect, useRef, useState } from 'react';
import { IGame } from '../../models/game';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Paper, InputBase } from '@mui/material';

interface SearchComponentProps {
  gameItems: IGame[];
}

const DropDownStyle: React.CSSProperties = {
  position: 'absolute',
  display: 'block',
  background: 'white',
  borderRadius: '10px'
};

const DropItemStyle: React.CSSProperties = {
  zIndex: 1,
  display: 'block',
  background: 'white',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  padding: '8px',
  borderRadius: '10px'
};

const SearchComponent: React.FC<SearchComponentProps> = ({ gameItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IGame[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const fetchMatchingGames = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/v1/game/search?term=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching matching games:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetchMatchingGames();
    }
    else{
      setDropdownOpen(false);
    }

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownOpen(true);
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 300,
          border: '2px solid black',
          borderRadius: '10px',
        }}
      >
        <InputBase
          placeholder="Search for games..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ ml: 1, flex: 1 }}
        />
      </Paper>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ ...DropDownStyle, display: isDropdownOpen ? 'block' : 'none' }} ref={dropdownRef}>
          {isLoading ? (
            <div style={{...DropItemStyle,color: 'black'}}>Loading...</div>
          ) : searchTerm !== '' && searchResults.length === 0 ? (
            <div style={{ ...DropItemStyle, color: 'black' }}>No Results</div>
          ) : (
            searchResults.map((item) => (
              <Link key={item._id} to={`/game/${item._id}`}style={DropItemStyle} onClick={()=>{Navigate(`/game/${item._id}`)}}>
                {item.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
