import { createCampaign, dashboard, logout, payment, profile, withdraw, money, menu } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'artwork',
    imgUrl: createCampaign,
    link: '/uploadArtwork',
  },
  {
    name: 'auctionPlace',
    imgUrl: payment,
    link: '/auction',
  },
  {
    name: 'uploadedArtworks',
    imgUrl: withdraw,
    link: '/uploaded',
  },
  {
    name: 'artworksSold',
    imgUrl: money,
    link: '/sold',
  },
  {
    name: 'artworksBought',
    imgUrl: profile,
    link: '/bought',
  },
];