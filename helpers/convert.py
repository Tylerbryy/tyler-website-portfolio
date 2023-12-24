import csv
import json

# Read the CSV file and parse the data
books = {'read': [], 'currently-reading': [], 'to-read': []}
with open('goodreads_library_export.csv', mode='r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        shelf = row['Exclusive Shelf'].lower().replace(' ', '-')
        if shelf in books:
            books[shelf].append({
                'title': row['Title'],
                'author': row['Author'],
                'rating': row['My Rating'],
                'year_published': row['Year Published'],
                'read_count': row['Read Count'],
                'book_id':row['Book Id']
            })

# Convert the categorized books to JSON
with open('books.json', 'w', encoding='utf-8') as jsonfile:
    json.dump(books, jsonfile, ensure_ascii=False, indent=4)