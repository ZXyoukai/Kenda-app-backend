/**
 * Upload Controller
 * Gerencia upload de arquivos
 */

import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { getFileUrl } from '../config/upload';

export class UploadController {
  async uploadAvatar(req: AuthRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileUrl = getFileUrl(req.file.filename);

      res.json({
        message: 'File uploaded successfully',
        url: fileUrl,
        filename: req.file.filename,
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  }
}
