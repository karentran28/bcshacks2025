# bcshacks2025

## Inspiration  
We like to sing, but we don’t always hit the notes. We wanted a way to find songs that actually *fit* our voices, so karaoke feels good, not painful.

---

## What it does  
MicDrop helps you find your vocal range in seconds, just sing your lowest and highest comfortable notes. Then, it suggests songs from our curated library that match that range.  
You get to sing confidently, without straining or guessing.

---

## How we built it  
- **Frontend:** React + TypeScript + CSS  
- **Backend:** Flask + Python (Librosa + SoundDevice for pitch detection)  
- **Database:** Supabase (stores song metadata and pitch range)  
- **Authentication:** Supabase  
- **Pitch Matching:** Matches your range to songs based on their vocal requirements  
- **WebAudio API:** Used for real-time equalizer animations and mic control  
- **Extras:**  
  - Animated recording overlay  
  - Audio ducking when recording  
  - MP3 and LRC syncing for karaoke mode  
  - Live visual feedback (equalizer bars!)

---

## Challenges we ran into  
- **Pitch Detection Nightmares:** Noisy mics? Room echoes? Our Librosa setup was like, “Is this a note or a sneeze?”  
- **Responsive Design:** Making the frontend behave across laptops, desktops, and browser sizes  
- **Autoplay Restrictions:** Browsers blocking our beautiful background music 😭  
- **Async Mic Input:** Getting real-time mic input synced and usable in the UI  
- **MP3 + LRC Syncing:** Aligning lyrics with audio in real-time was trickier than expected

---

##  Accomplishments that we're proud of  
- Built a smooth pitch test flow with live feedback  
- **Song matching that works**.tested it with our off-key team: success!  
- A fun, responsive, and polished UI  
- Background music that vibes, but ducks during mic input 🎧

---

##  What we learned  
- Audio is **hard.**  
  Pitch detection is a battle against noise, latency, and browser quirks  
- WebAudio is powerful but can be tricky

---

##  What's next for MicDrop  
- **Party Mode:** Live scoring, leaderboards, and “who can hold the longest note” challenge  
- **More Songs:** Expanding our library—though “Bye Bye Bye” is still a banger  
- **MicDrop Pro:** Add pitch correction tips, vocal warmups, or harmonizing features  

## Click here for a quick demo!
https://youtu.be/qpa80ZGouLY
