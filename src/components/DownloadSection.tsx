
import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

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
            <h2 className="download-title">Get PocketQuest Today</h2>
            <p className="download-description">
              Start your health adventure now. Available on all major platforms.
            </p>
            
            <div className="download-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="download-btn app-store"
              >
                <span className="store-icon">📱</span>
                <div className="store-text">
                  <span className="store-label">Download on the</span>
                  <span className="store-name">App Store</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="download-btn google-play"
              >
                <span className="store-icon">🤖</span>
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
