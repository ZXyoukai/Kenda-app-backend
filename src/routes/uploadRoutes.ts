/**
 * Upload Routes
 * Rotas para upload de arquivos
 */

import { Router } from 'express';
import { UploadController } from '../controllers/uploadController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../config/upload';

const router = Router();
const uploadController = new UploadController();

// Upload de avatar (protegido por autenticação)
router.post('/avatar', authMiddleware, upload.single('avatar'), uploadController.uploadAvatar);

export default router;
