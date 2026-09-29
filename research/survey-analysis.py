import csv, io, os, collections
rows = list(csv.reader(io.open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'survey-responses.csv'), encoding='utf-8')))
H, D = rows[0], rows[1:]
N = len(D)

def single(col):
    c = collections.Counter(r[col].strip() for r in D if len(r) > col and r[col].strip())
    return c

# checkbox columns: match against known options instead of splitting on comma
OPTS = {
 8: ["Groww","Zerodha (Kite / Coin)","Upstox","Angel One","Dhan","INDmoney",
     "Jar / Siply / other round-up savings app","A crypto app","My bank's own app","None"],
 9: ["Friends","Parents / family","Instagram or YouTube finance creators",
     "Reddit / Twitter / online groups","ChatGPT or similar","The investing app itself",
     "WhatsApp groups","Nowhere really"],
10:["What actually happens to my money after I tap invest",
    "The difference between mutual fund vs index fund vs ETF vs stock",
    "How much I'll really pay in charges","How much I should be investing",
    "When I'm supposed to sell","What to do when it's showing a loss",
    "How tax on this works","Whether my money is safe with the app",
    "Honestly I've never tried to find out"],
}
def multi(col):
    c = collections.Counter()
    for r in D:
        if len(r) <= col: continue
        cell = r[col]
        for o in OPTS[col]:
            if o in cell: c[o] += 1
    return c

print("n =", N, "responses\n")
for col in [1,2,3,4,5,6,7]:
    print("--- Q%d. %s" % (col, H[col][:78]))
    for k,v in single(col).most_common():
        print("    %2d  %s" % (v, k[:72]))
    print()
for col in [8,9,10]:
    print("--- Q%d. %s  (tick all)" % (col, H[col][:64]))
    for k,v in multi(col).most_common():
        print("    %2d  %s" % (v, k[:72]))
    print()

free = [r[11].strip() for r in D if len(r)>11 and r[11].strip()]
print("--- Q11 free text (%d of %d left something)" % (len(free), N))
for t in free: print("    >", t[:300])
print("")
print("--- Q12: 16 of %d left contact details for interviews" % N)
print("    (that column is stripped from this CSV - it held names and phone numbers)")
