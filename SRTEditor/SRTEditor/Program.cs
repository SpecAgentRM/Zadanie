using System.IO;
namespace SRTEditor
{
    class SRTEditor
    {
        public static void Main()
        {
            var plik = File.ReadAllLines("napisy do filmu.srt");
            List<string> nplik = new List<string>();
            List<string> wynik1 = new List<string>();
            List<string> wynik2 = new List<string>();
            List<string> zapis = new List<string>();
            foreach (var line in plik)
            {
                bool liczba = int.TryParse(line, out _);
                if (liczba == true)
                {
                    nplik.Add(line);
                }
                else if (line.Contains("-->") == true)
                {
                    string[] czasy = line.Split(" --> ");
                    List<string> nczasy = new List<string>();
                    foreach (var czas in czasy)
                    {
                        string[] jednostki = czas.Split(new char[] {':', ','});
                        int ms = Convert.ToInt32(jednostki[3]);
                        int sek = Convert.ToInt32(jednostki[2]);
                        int min = Convert.ToInt32(jednostki[1]);
                        int godz = Convert.ToInt32(jednostki[0]);
                        ms += 880;
                        sek += 5;
                        if(ms > 999)
                        {
                            sek++;
                            ms = ms - 1000;
                        }
                        if(sek > 59)
                        {
                            min++;
                            sek = sek - 60;
                        }
                        if (min > 59)
                        {
                            godz++;
                            min = min - 60;
                        }
                        string nmin, nsek, nms;
                        if(min < 10)
                        {
                            nmin = "0" + Convert.ToString(min);
                        }
                        else
                        {
                            nmin = Convert.ToString(min);
                        }
                        if (sek < 10)
                        {
                            nsek = "0" + Convert.ToString(sek);
                        }
                        else
                        {
                            nsek = Convert.ToString(sek);
                        }
                        if (ms < 100)
                        {
                            nms = "0" + Convert.ToString(ms);
                        }
                        else if (ms < 10)
                        {
                            nms = "00" + Convert.ToString(ms);
                        }
                        else
                        {
                            nms = Convert.ToString(ms);
                        }
                        if (nms == "00")
                        {
                            nms = "000";
                        }
                        nczasy.Add(godz + ":" + nmin + ":" + nsek + "," + nms);
                    }
                    nplik.Add(nczasy[0] + " --> " + nczasy[1]);
                }
                else
                {
                    nplik.Add(line);
                }
            }
            int rozmiar = nplik.Count;
            foreach (var s in nplik)
            {
                if(s.Contains("-->") == true)
                {
                    string[] czasy = s.Split(" --> ");
                    string[] jednostki = czasy[0].Split(new char[] { ':', ',' });
                    String ms = jednostki[3];
                    if(ms == "000")
                    {
                        wynik1.Add(nplik[nplik.IndexOf(s) - 1]);
                        wynik1.Add(nplik[nplik.IndexOf(s)]);
                        wynik1.Add(nplik[nplik.IndexOf(s) + 1]);
                        if (nplik.IndexOf(s) + 2 < rozmiar)
                        {
                            if (nplik[nplik.IndexOf(s) + 2] != "")
                            {
                                wynik1.Add(nplik[nplik.IndexOf(s) + 2]);
                            }
                        }
                        wynik1.Add("");
                    }
                    else
                    {
                        wynik2.Add(nplik[nplik.IndexOf(s) - 1]);
                        wynik2.Add(nplik[nplik.IndexOf(s)]);
                        wynik2.Add(nplik[nplik.IndexOf(s) + 1]);
                        if (nplik.IndexOf(s) + 2 < rozmiar)
                        {
                            if (nplik[nplik.IndexOf(s) + 2] != "")
                            {
                                wynik2.Add(nplik[nplik.IndexOf(s) + 2]);
                            }
                        }
                        wynik2.Add("");
                    }
                 
                }             
            }
            int id = 0;
            foreach(var line in wynik1)
            {
                bool liczba = int.TryParse(line, out _);
                if (liczba == true)
                {
                    id++;
                    zapis.Add(Convert.ToString(id));
                }
                else
                {
                    zapis.Add(line);
                }
            }
            File.WriteAllLines("pelne-sekundy.txt", zapis);
            zapis.Clear();
            id = 0;
            foreach(var line in wynik2)
            {
                bool liczba = int.TryParse(line, out _);
                if (liczba == true)
                {
                    id++;
                    zapis.Add(Convert.ToString(id));
                }
                else
                {
                    zapis.Add(line);
                }
            }
            File.WriteAllLines("niepelne-sekundy.txt", zapis);
            zapis.Clear();
        }
    }
}