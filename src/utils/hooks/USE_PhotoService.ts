/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
import {isIos} from '../helpers/platform';

export const usePhotoService = (cb: (data: string[]) => void) => {
  const [permissionDenied, setPermissionDenied] = React.useState(false);
  const [photosUploaded, refreshUploadedPhoto] = React.useState<string[]>([]);
  const [photoLimit, setPhotoLimit] = React.useState(0);

  const createFormData = (fileName: string, type: string, uri: string) => {
    const data: any = new FormData();
    data.append('file', {
      name: fileName,
      type,
      uri: isIos ? uri.replace('file://', '') : uri,
    });
    return data;
  };

  const savePhoto = async ({type, uri}: ImagePickerResponse) => {
    if (type && uri) {
      const pictureData = {
        fileName: uri,
        type,
        uri,
      };
      const blob = createFormData(uri, type, uri);
      refreshUploadedPhoto(currentPhotos => [...currentPhotos, pictureData]);
    }
  };

  const uploadPhoto = async () => {
    const options: ImagePickerOptions = {
      title: 'Фото',
      cancelButtonTitle: 'Отмена',
      takePhotoButtonTitle: 'Сделать фото',
      chooseFromLibraryButtonTitle: 'Выбрать из галереи',
      cameraType: 'front',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const openPhotoModal = () => {
      ImagePicker.launchCamera(options, (response: ImagePickerResponse) => {
        if (response.didCancel || response.error) {
          return null;
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
        Toast.show('Versuchen Sie es erneut.');
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

  React.useEffect(() => {
    const everyonePhotosUploaded = photosUploaded.length === photoLimit;
    const isNotStartedPhoto = photoLimit === 0;
    if (isNotStartedPhoto || permissionDenied) {
      return () => {};
    }
    if (everyonePhotosUploaded) {
      // const resetStatesByTime = setTimeout(() => {
      //   refreshUploadedPhoto([]);
      //   setPhotoLimit(0);
      // }, 200);
      // return () => clearTimeout(resetStatesByTime);
      cb(photosUploaded);
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
