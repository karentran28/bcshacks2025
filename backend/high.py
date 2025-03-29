import sounddevice as sd
import librosa
import numpy as np
from collections import Counter
import noisereduce as nr

DURATION = 5
SAMPLE_RATE = 44100
FMIN = librosa.note_to_hz('C4')  # Lower bound for high note test
FMAX = librosa.note_to_hz('C7')  # Upper range

print("Recording HIGH note... Sing your highest comfortable note.")

audio = sd.rec(int(DURATION * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=1, dtype='float32')
sd.wait()
audio = audio.flatten()

# Detect pitch
reduced_audio = nr.reduce_noise(y=audio, sr=SAMPLE_RATE)
pitches = librosa.yin(reduced_audio, fmin=FMIN, fmax=FMAX, sr=SAMPLE_RATE)
valid_pitches = pitches[~np.isnan(pitches)]
valid_pitches = valid_pitches[(valid_pitches >= FMIN) & (valid_pitches <= FMAX)]

if len(valid_pitches) == 0:
    print("No valid pitch detected.")
    exit()

# Round to nearest note
rounded_notes = [librosa.hz_to_note(freq) for freq in valid_pitches]
most_common_note = Counter(rounded_notes).most_common(1)[0][0]

print(f"Detected highest note: {most_common_note}")

with open("high_note_pitch.txt", "w") as f:
    f.write(most_common_note)
