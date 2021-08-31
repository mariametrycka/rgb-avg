# RGB AVG

Opis zadania:

1. Dany jest zbiór plików PNG.
2. Dla każdego pliku PNG można wyliczyć średnią składowych RGB.
3. Napisać skrypt/program/aplikację webową, która po podaniu trzech wartości liczbowych R, G, B wyszuka N (wartość podawana przez użytkownika) obrazów o średnich wartościach RGB najbardziej zbliżonych do podanych trzech wartości R, G, B.

Projekt składa się z dwóch programów.
Zadaniem pierwszego z nich - process.js (`node process.js`)- jest przejście po wszystkich plikach znajdujących się w folderze "data" i obliczenie dla każdego z nich średnich wartości RGB. Następnie dane te zapisywane są w pliku data.json jako tablica tablic, gdzie każda z nich zawiera ścieżkę do pliku oraz jego średnie wartości RGB.

Drugi program - find.js (`node find.js`)- pobiera od użytkownika wartości RGB oraz ilość plików, które użytkownik chce wyświetlić. Program traktuje średnie wartości RGB oraz wartości podane przez użytkownika jako punkty w przestrzeni trójwymiarowej. Dla każdego pliku oblicza jego odległość od punktu podanego przez użytkownika i sortuje je rosnąco. Następnie wyświetla N plików o najmniejszych odległościach
