export function isMobile() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Additional check for touch capability (more reliable for tablets)
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return isMobile || hasTouchScreen;
}

// Example usage:
// if (isMobile()) {
//   console.log("Page is running on a mobile device.");
  // Add mobile-specific code here (e.g., redirect, load different CSS)
  // For example:
  // document.body.classList.add('mobile'); // Add a class to the body
// } else {
//   console.log("Page is running on a desktop/laptop.");
  // Add desktop-specific code here
// }


// More robust approach (using user agent hints - experimental but more accurate)
export async function isMobileAdvanced() {
  if (navigator.userAgentData) { // Check if userAgentData is available
    const mobile = await navigator.userAgentData.getHighEntropyValues(['mobile']);
    return mobile.mobile;
  } else {
    // Fallback to the traditional user agent check if userAgentData is not available
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}

// Example usage of the advanced approach
// isMobileAdvanced().then(isMobileDevice => {
//     if (isMobileDevice) {
//         console.log("Page is running on a mobile device (Advanced check).");
//     } else {
//         console.log("Page is NOT running on a mobile device (Advanced check).");
//     }
// });


//Detecting specific mobile operating systems

export function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

// console.log("Mobile OS: " + getMobileOperatingSystem());
const ismobileDevice = isMobile();
export default ismobileDevice;