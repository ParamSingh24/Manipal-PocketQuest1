import React from 'react';
import { motion } from 'framer-motion';
import { Download, Apple, Smartphone } from 'lucide-react';

const DownloadSection = () => {
  return (
    <section className="download-section">
      <div className="download-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="download-content"
        >
          <div className="download-text">
            <h2 className="download-title">Get Manipal PokeQuest Today</h2>
            <p className="download-description">
              Start your health adventure now. Available on all major platforms.
            </p>
            
            <div className="download-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="download-btn app-store"
                style={{
                  background: '#FF6B35',
                  border: '3px solid #FF6B35',
                  borderRadius: '8px',
                  boxShadow: '0 0 0 #FF6B358c',
                  color: 'white',
                  position: 'relative',
                  padding: '12px 35px',
                  fontSize: '17px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer'
                }}
              >
                <svg className="star-1" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M12.5 0L15.3064 8.2918H24.3882L17.0409 13.4164L19.8473 21.7082L12.5 16.5836L5.15268 21.7082L7.95911 13.4164L0.611794 8.2918H9.69357L12.5 0Z"/>
                </svg>
                <svg className="star-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M7.5 0L9.18384 4.97508H14.6329L10.2246 8.04984L11.9084 13.0249L7.5 9.95016L3.09161 13.0249L4.77545 8.04984L0.367076 4.97508H5.81616L7.5 0Z"/>
                </svg>
                <svg className="star-3" width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M2.5 0L3.06128 1.65836H4.87763L3.40818 2.68328L3.96946 4.34164L2.5 3.31672L1.03054 4.34164L1.59182 2.68328L0.122372 1.65836H1.93872L2.5 0Z"/>
                </svg>
                <svg className="star-4" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M4 0L4.89805 2.65145H7.83676L5.46935 4.29715L6.3674 6.9486L4 5.3029L1.6326 6.9486L2.53065 4.29715L0.16324 2.65145H3.10195L4 0Z"/>
                </svg>
                <svg className="star-5" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M7.5 0L9.18384 4.97508H14.6329L10.2246 8.04984L11.9084 13.0249L7.5 9.95016L3.09161 13.0249L4.77545 8.04984L0.367076 4.97508H5.81616L7.5 0Z"/>
                </svg>
                <svg className="star-6" width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M2.5 0L3.06128 1.65836H4.87763L3.40818 2.68328L3.96946 4.34164L2.5 3.31672L1.03054 4.34164L1.59182 2.68328L0.122372 1.65836H1.93872L2.5 0Z"/>
                </svg>
                <Apple className="store-icon" size={24} />
                <div className="store-text">
                  <span className="store-label">Download on the</span>
                  <span className="store-name">App Store</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="download-btn google-play"
                style={{
                  background: '#FF6B35',
                  border: '3px solid #FF6B35',
                  borderRadius: '8px',
                  boxShadow: '0 0 0 #FF6B358c',
                  color: 'white',
                  position: 'relative',
                  padding: '12px 35px',
                  fontSize: '17px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer'
                }}
              >
                <svg className="star-1" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M12.5 0L15.3064 8.2918H24.3882L17.0409 13.4164L19.8473 21.7082L12.5 16.5836L5.15268 21.7082L7.95911 13.4164L0.611794 8.2918H9.69357L12.5 0Z"/>
                </svg>
                <svg className="star-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M7.5 0L9.18384 4.97508H14.6329L10.2246 8.04984L11.9084 13.0249L7.5 9.95016L3.09161 13.0249L4.77545 8.04984L0.367076 4.97508H5.81616L7.5 0Z"/>
                </svg>
                <svg className="star-3" width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M2.5 0L3.06128 1.65836H4.87763L3.40818 2.68328L3.96946 4.34164L2.5 3.31672L1.03054 4.34164L1.59182 2.68328L0.122372 1.65836H1.93872L2.5 0Z"/>
                </svg>
                <svg className="star-4" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M4 0L4.89805 2.65145H7.83676L5.46935 4.29715L6.3674 6.9486L4 5.3029L1.6326 6.9486L2.53065 4.29715L0.16324 2.65145H3.10195L4 0Z"/>
                </svg>
                <svg className="star-5" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M7.5 0L9.18384 4.97508H14.6329L10.2246 8.04984L11.9084 13.0249L7.5 9.95016L3.09161 13.0249L4.77545 8.04984L0.367076 4.97508H5.81616L7.5 0Z"/>
                </svg>
                <svg className="star-6" width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fil0" d="M2.5 0L3.06128 1.65836H4.87763L3.40818 2.68328L3.96946 4.34164L2.5 3.31672L1.03054 4.34164L1.59182 2.68328L0.122372 1.65836H1.93872L2.5 0Z"/>
                </svg>
                <Smartphone className="store-icon" size={24} />
                <div className="store-text">
                  <span className="store-label">Get it on</span>
                  <span className="store-name">Google Play</span>
                </div>
              </motion.button>
            </div>

            <div className="compatibility-info">
              <p>Compatible with iOS 12+ and Android 8+</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="download-visual"
          >
            <div className="qr-code-container">
              <div className="qr-code">
                <div className="qr-pattern"></div>
                <Download className="qr-icon" />
              </div>
              <p className="qr-text">Scan to download</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
