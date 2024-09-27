export const convertTimeToSince = (time: number) => {
    const seconds: number = Math.floor(
        (new Date().getTime() - time) / 1000
      );
    
      let interval: number = seconds / 31536000;
      if (interval >= 1) {
        return Math.floor(interval) + " năm";
      }
    
      interval = seconds / 2592000;
      if (interval >= 1) {
        return Math.floor(interval) + " tháng";
      }
    
      interval = seconds / 86400;
      if (interval >= 1) {
        return Math.floor(interval) + " ngày";
      }
    
      interval = seconds / 3600;
      if (interval >= 1) {
        return Math.floor(interval) + " giờ";
      }
    
      interval = seconds / 60;
      if (interval >= 1) {
        return Math.floor(interval) + " phút";
      }

      return Math.floor(interval) + " giây";

}