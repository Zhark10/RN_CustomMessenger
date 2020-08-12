import React, { useState, useEffect } from 'react';
import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
import {isIos} from '../helpers/platform';
import {IPhotoType} from '../../types';

export const usePhotoService = (
  sendAnswerCallback: (data: string[]) => void,
  startSendingCallback: () => any,
  sendInVeriffCallback: (data: string, photoType: IPhotoType) => any,
) => {
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [photosUploaded, refreshUploadedPhoto] = useState<any[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoLimit, setPhotoLimit] = useState(0);

  const savePhoto = async ({type, uri}: ImagePickerResponse) => {
    if (type && uri) {
      const pictureData = {
        fileName: uri,
        type,
        uri,
      };
      refreshUploadedPhoto(currentPhotos => [...currentPhotos, pictureData]);
    }
  };

  const uploadPhoto = async () => {
    const options: ImagePickerOptions = {
      mediaType: 'photo',
      cameraType: 'front',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const openPhotoModal = () => {
      startSendingCallback();
      ImagePicker.launchCamera(options, (response: ImagePickerResponse) => {
        if (response.didCancel || response.error) {
          startSendingCallback();
          setPhotoLimit(0);
          return null;
        }

        const base64 = 'data:image/png;base64,' + response.data;
        if (photoLimit === 2 && photoIndex === 0) {
          sendInVeriffCallback(base64, 'document-front');
          setPhotoIndex(1);
        } else if (photoIndex === 1) {
          sendInVeriffCallback(base64, 'document-back');
        } else {
          sendInVeriffCallback(base64, 'face');
        }
        savePhoto(response);
      });
    };

    const requestPermissions = async () => {
      try {
        const permissionRequestResult = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.CAMERA,
          ],
        );

        const isCameraApproved =
          permissionRequestResult['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED;

        const isStorageApproved =
          permissionRequestResult[
            'android.permission.WRITE_EXTERNAL_STORAGE'
          ] === PermissionsAndroid.RESULTS.GRANTED;

        if (!isCameraApproved || !isStorageApproved) {
          setPermissionDenied(true);
        } else {
          openPhotoModal();
        }
      } catch (err) {
        // try again notice
        Toast.show('Упс, что-то пошло не так.');
      }
    };

    if (isIos) {
      openPhotoModal();
      return null;
    }

    const isWritingAllowed = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    const isCameraAllowed = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!isWritingAllowed || !isCameraAllowed) {
      requestPermissions();
    } else {
      openPhotoModal();
    }
    return null;
  };

  useEffect(function whatToDoNextAfterPhotoUpload() {
    const everyonePhotosUploaded = photosUploaded.length === photoLimit;
    const isNotStartedPhoto = photoLimit === 0;
    if (isNotStartedPhoto || permissionDenied) {
      return () => {};
    }
    if (everyonePhotosUploaded) {
      sendAnswerCallback(photosUploaded);
      return () => {};
    }
    (async () => {
      await uploadPhoto();
    })();
  }, [photosUploaded, permissionDenied, photoLimit]);

  const sendPhotos = (count: number) => {
    setPhotoLimit(count);
  };

  return {
    sendPhotos,
  };
};
