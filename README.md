# Low Earth Orbit Satellite Tracker and Pass Predictor

This is simple, experimental, progressive web application that I can use to track LEO (Low Earth Orbit) satellites near the user's device's location. Some of these satellites transmit freely available data on frequencies that persons on earth can receive using adequate equipment, such as a HAM transceiver or a radio scanner. Think of [APT weather satellites](https://en.wikipedia.org/wiki/Automatic_picture_transmission) such as NOAA 19, NOAA 18 and NOAA 15.

## Current satellites

Data about future, interesting passes is fetched for the following satellites:

- [NOAA 19](https://en.wikipedia.org/wiki/NOAA-19) (American, Weather, Amateur Radio)
- [NOAA 18](https://en.wikipedia.org/wiki/NOAA-18) (American, Weather, Amateur Radio)
- [NOAA 15](https://en.wikipedia.org/wiki/NOAA-15) (American, Weather, Amateur Radio)

New satellites are added on an irregular basis. All data by [n2yo.com](https://www.n2yo.com/).

## How to use on your device (in browser)

When using for the first time, you need to enter a [n2yo.com](https://www.n2yo.com/) API key. You can create one for free by siging up on their website. Without this key entered, no data can be retrieved.

All shown times are local. Passes are fetched using the last known position and are then cached. If you don't see any passes, try to refetch below. A refetch is done automatically if the last fetch was over 24 hours ago. Fetching always happens with the latest device coordinates (GPS, if permission was granted, or by approximation).

Save the web app on your home screen for easy future access.

### Use cases

A tracker indicator is shown when a satellite pass is currently happening, showing azimuth, elevation and time data. A nice use case for this is recording the satellite downlink signal (usually broadcasted between 137 and 138 MHz in a +/- 34 kHz bandwith for NOAA weather satellites). The data shown can help you set things up or plan ahead.

## Disclaimer

This is a work in progress, so bear with me.

## Privacy

No personal (usage) data is gathered and/or used. All (cached) fetch data, your API key etc. is stored on your device and only used for fetching data from [n2yo.com](https://www.n2yo.com/).

## Future roadmap

- Figure out calculation of the doppler shift so it can display the correct downlink frequency during any stage of the pass
- Add graphical information about the pass (where is the satellite from the user's point of view) to ease tracking
