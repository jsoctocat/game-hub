import noImage from '../assets/360_F_552371867_LkVmqMEChRhMMHDQ2drOS8cwhAWehgVc.jpg'

const GetCroppedImageUrl = (url: string) => {
    if (!url) return noImage;

    const target = 'media/';
    const index = url.indexOf(target) + target.length;
    return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
}

export default GetCroppedImageUrl;