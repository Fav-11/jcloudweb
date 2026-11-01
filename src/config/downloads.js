/**
 * Windows Server release configuration.
 *
 * IMPORTANT: Populate this file only with a verified public GitHub repository
 * and release asset. The website never hosts the installer and never uses a
 * GitHub token in browser code.
 */
export const downloads = {
  verificationStatus: 'unverified',
  repository: {
    owner: 'Fav-11',
    name: 'jcloudweb',
    url: 'https://github.com/Fav-11/jcloudweb',
    releasesUrl: 'https://github.com/Fav-11/jcloudweb/releases',
  },
  latestReleaseUrl: 'https://github.com/Fav-11/jcloudweb/releases/latest',
  directInstallerUrl: null,
  installerFilename: null,
  displayVersion: 'Version pending verification',
  releaseDate: null,
  releaseNotes: [],
  sha256: null,
  checksumAssetUrl: null,
  supportedWindows:
    'The supported Windows matrix must be verified against the published installer configuration.',
  installerRequirements: [
    'A Windows computer on which J-Cloud will run',
    'Administrator permission when prompted by Windows',
    'An internet connection for installation, pairing, and remote access',
    'Sufficient local storage for the files you intend to access',
  ],
};

export const isReleaseVerified = downloads.verificationStatus === 'verified';
