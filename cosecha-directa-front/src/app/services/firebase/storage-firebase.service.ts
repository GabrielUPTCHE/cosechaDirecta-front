import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL, listAll } from '@angular/fire/storage';

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

  async uploadProductImages(idProduct:string,username: string, productName: string, images: File[]): Promise<any> {
    const uploadTasks = images.map(async element => {
      const storageRef = ref(this.storage, `products/${username}/${productName}-${idProduct}/${element.name}`);
      return uploadBytesResumable(storageRef, element);
    });
    await Promise.all(uploadTasks);
  }
  
  async getImagesProduct(idProduct:string,username:string, productName:string):Promise< string[] >{
    let urlImages:string[] = [];
    const storageRef = ref(this.storage,`products/${username}/${productName}-${idProduct}`);
    const images = await listAll(storageRef);
    for (const image of images.items) {
      const url = await getDownloadURL(image)
      urlImages.push(url);
    }
    return urlImages;
    
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
