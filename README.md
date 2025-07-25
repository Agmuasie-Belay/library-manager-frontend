# 📚 Library Manager – React App

A full-featured library management system built with **React** and **Tailwind CSS**, offering secure role-based access and powerful admin/librarian tools.

## 🔐 Authentication & Roles

- JWT-based **login** and **logout**
- **Role-based access**:
  - **Admin**: Access to Dashboard, Books, Borrow/Return, Members, Staff, Reports, Genres
  - **Librarian**: Access to Dashboard (customized), Books, and Borrow/Return

## 📊 Dashboard

- Displays key library statistics:
  - Total number of books
  - Total registered members
  - Number of active borrows
  - Overdue books
- Includes quick action buttons for common tasks

## 📚 Book Management

- List all books with **search** and **filtering**
- **Create**, **view**, **edit**, and **delete** books
- Track available copies and update after borrow/return

## 👥 Member Management

- List members with **search** capability
- Register new members and edit existing details
- View full borrowing history of each member
- Delete member records

## 🔄 Borrow & Return

- Borrow books with **due date selection**
- Return books and update stock
- Validate available copies before allowing borrow

## 🏷️ Genre Management

- View all genres
- Add, edit, or delete genres
- See statistics of popular genres

## 👨‍💼 Staff Management

- View staff accounts
- Add new staff with assigned role (admin or librarian)
- Delete staff users

## 📈 Reports

- Generate a list of **overdue books**
- View popular genres by borrow trends

## 🚀 Tech Stack

- **React** (frontend)
- **Tailwind CSS** (styling)
- **Vite** (build tool)
- Backend: Local Node.js API 
