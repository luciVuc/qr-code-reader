import React, { useCallback, useRef } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'react-ui';
import { tokens, components } from 'react-ui/themes/light';
import { useNavBack } from './hooks';
import { About, BusyIndicator, Home, Result } from './components';

components.Button.variants = {
  ...components.Button.variants,
  primary: {
    ...components.Button.variants.primary,
    borderRadius: '.8rem',
    backgroundColor: '#333333',
    borderColor: '#333333',
    color: 'white',
    padding: '1rem',
    ':hover': { backgroundColor: '#555555' },
    ':focus': { backgroundColor: '#444444' },
    ':active': { backgroundColor: '#000000' }
  }
};

export function App() {
  const navigate = useNavigate();
  const busyIndicatorRef = useRef<HTMLDivElement>(null);

  const handleResultUploadSelect = useCallback(() => {
    if (busyIndicatorRef?.current) {
      busyIndicatorRef.current.style.display = 'none';
    }
  }, []);

  const handleUploadCancel = useCallback(() => {
    if (busyIndicatorRef?.current) {
      busyIndicatorRef.current.style.display = 'none';
    }
  }, []);

  const handleUploadClick = useCallback(() => {
    if (busyIndicatorRef?.current) {
      busyIndicatorRef.current.style.display = '';
    }
  }, []);

  const handleUploadSelect = useCallback((imgFile?: File | null) => {
    navigate('/result', { state: { imgFile } });
    if (busyIndicatorRef?.current) {
      busyIndicatorRef.current.style.display = 'none';
    }
  }, [navigate]);

  useNavBack();

  return (
    <ThemeProvider tokens={tokens} components={components}>
      <>
        <Routes>
          <Route path='/' element={<Home onUploadCancel={handleUploadCancel} onUploadClick={handleUploadClick} onUploadSelect={handleUploadSelect} />} />
          <Route path='/scan' element={<Home onUploadCancel={handleUploadCancel} onUploadClick={handleUploadClick} onUploadSelect={handleUploadSelect} />} />
          <Route path='/result' element={<Result onUploadCancel={handleUploadCancel} onUploadClick={handleUploadClick} onUploadSelect={handleResultUploadSelect} />} />
          <Route path='/about' element={<About />} />
        </Routes>

        <BusyIndicator ref={busyIndicatorRef} />

        {/* <Element
          data-testid="busy-indicator"
          as="div"
          ref={busyIndicatorRef}
          style={{
            display: 'none'
          }}
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <Spinner size="large" />
        </Element> */}
      </>
    </ThemeProvider>
  );
}

export default App;
