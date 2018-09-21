# voter-assistant
An easy-to-use, one page tool relying on the VoterView Web Services API.

## See It Running

- [Sault Ste. Marie Voter Services](https://voter.saultstemarie.ca/voterServices/)

## Requirements

This project aims to run with very little effort on older software,
a common case for municipalities.

- IIS 8 or better.
- ASP scripting enabled.
- VoterView Web Services API.
- VoterView iFrame (for Voters List lookup).

## Getting Started

- Download a copy of this project to a folder on your web server.
- Create a new website using the IIS Manage application, pointing at the folder.
- Create a copy of `inc/settings-sample.asp` named `inc/settings.asp`.
- Enter your VoterView Web Services login credentials in the `settings.asp` file.
