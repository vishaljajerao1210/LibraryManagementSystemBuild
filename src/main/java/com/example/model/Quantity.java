package com.example.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="quantity")
public class Quantity {
    
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	int accountId;
	
	@ManyToOne
	@JsonIgnore
	Book book;
	
	@Enumerated(EnumType.STRING)
    private Status status;

	public int getAccountId() {
		return accountId;
	}

	public void setAccountId(int accountId) {
		this.accountId = accountId;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
	
}
