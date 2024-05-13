import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageFirebaseService {

  private readonly storage = inject(Storage);

  constructor() { }

  async uploadFile(username:string, photo:File): Promise<any> {
    const storageRef = ref(this.storage,`users/${username}/`)
    await uploadBytesResumable(storageRef, photo);
  }

  async getDownloadUrlByUsername(username: string): Promise<string | null> {
    try {
      const storageRef = ref(this.storage, `users/${username}/`);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error al obtener la URL de descarga:', error);
      return null;
    }
  }
}
