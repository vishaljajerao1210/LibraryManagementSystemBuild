package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.BookDetail;


public interface BookDetailRepository extends JpaRepository<BookDetail, Integer> {

}
