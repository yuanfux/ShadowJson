# ShadowJson

## Why?
In many dev cases, we have to keep an original JSON object while having another deep copied object for editing. Simply deep copying the whole object can lead to unnecessary memory usage and hard management with the original data. Shadow Json solves these problems by
1. allow path-specific clone
2. easy commit/discard changes
3. small libs