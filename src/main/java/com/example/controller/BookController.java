package com.example.controller;

import java.util.ArrayList;
import java.util.HashMap;
//import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.neo4j.cypher.internal.compiler.v2_2.replace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Status;
import com.example.model.Book;
import com.example.model.BookDetail;
import com.example.model.Category;
import com.example.model.Fine;
import com.example.model.Member;
import com.example.model.Quantity;
import com.example.repositories.BookDetailRepository;
import com.example.repositories.BookRepository;
import com.example.repositories.CategoryRepository;
import com.example.repositories.FineRepository;
import com.example.repositories.MemberRepository;
import com.example.repositories.QuantityRepository;

@RestController
public class BookController {
	
	@Autowired
	BookRepository bookrepository;
	@Autowired
	CategoryRepository categoryrepository;
	@Autowired
	FineRepository finerepository;
	@Autowired
	BookDetailRepository bookdetailrepository;
	@Autowired
	MemberRepository memberrespository;
	@Autowired
	QuantityRepository quantityrepository;
	
	@RequestMapping("/categories")
		public List<Category> getCategories() {
		return (List<Category>) categoryrepository.findAll();
	}	
	
	@RequestMapping("/books")
	public List<Book> getBooks() {
		return (List<Book>) bookrepository.findAll();
	}	
	@RequestMapping("/bookdetails")
	public List<BookDetail> getBookdetails() {
		return (List<BookDetail>) bookdetailrepository.findAll();
	}	
	
	@RequestMapping("/book/{bookid}")
	public Book get(@PathVariable("bookid") int bookid)
	{
		return bookrepository.findOne(bookid);
		
	}
	@RequestMapping("/editCategory/{categoryid}")
	public HashMap<String,Object> editcategory(@RequestBody Category category) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		
		try {
			categoryrepository.save(category);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to add Category!!");
		}

		return returnParams;
	}

	@RequestMapping("/deletecopy/{accountid}")
	public void delete(@PathVariable("bookid")String accountid)
	{
	//	quantityrepository.delete(accountid);
	}
	
	@RequestMapping("/viewmybooks")
	public List<Book> getmybooks() {
		return (List<Book>) bookrepository.findAll();
	}
	
	@RequestMapping("/viewfine")
	public List<Fine> getfine() {
		return (List<Fine>) finerepository.findAll();
	}	
	@RequestMapping("/quantities")
	public List<Quantity> getEachBook() {
		return (List<Quantity>) quantityrepository.findAll();
	}
	
	@RequestMapping("/members")
	public List<Member> getallmybooks() {
		return (List<Member>) memberrespository.findAll();
	}
	
	@RequestMapping("/books/{isbn}")
	public List<Book> getBooks(@PathVariable("isbn") int isbn) {
		return (List<Book>) bookrepository.findOne(isbn);
	}	
	
	@RequestMapping("/issuebook/{id}")
	public List<BookDetail> getBookDetail(@PathVariable("id") int id) {
		return (List<BookDetail>) bookdetailrepository.findOne(id);
	}	
	
	@RequestMapping("/member/{id}")
	public List<BookDetail> getBookDetails(@PathVariable("id") int id)
	{
		return (List<BookDetail>) bookdetailrepository.findOne(id);
	}
	
		
	
	@RequestMapping("/addCategory")
	public HashMap<String,Object> addcategory(@RequestBody Category category) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		
		try {
			categoryrepository.save(category);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to add Category!!");
		}

		return returnParams;
	}
	
	@RequestMapping("/addBook")
	public HashMap<String,Object> addbook(@RequestBody Book book) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		
		try {
			int j=book.getCopies();
			List<Quantity>account=new ArrayList<Quantity>();
			int i=1;
			while(i<=j)
			{
				
				Quantity a=new Quantity();
					UUID uuid=UUID.randomUUID();
					String randomNo = uuid.toString();
					randomNo=randomNo.replace("-", "");
					
					a.setAccountId(randomNo);					
					a.setStatus(Status.Available);
					a.setBook(book);
					account.add(a);
				i++;
		}
			book.setQuantity(account);
						
			
			bookrepository.save(book);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to add book!!!!!!");
		}

		return returnParams;
	}
	
	@RequestMapping("/savemember")
	public HashMap<String,Object> addmember(@RequestBody Member mem) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		
		try {
			memberrespository.save(mem);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "Failed to Register the user!!!!!!");
		}

		return returnParams;
	}










@RequestMapping("/searchbytitle/{title}")
public Book searchbookbytitle(@PathVariable("title") String title)
{
	return bookrepository.findByTitle(title);
	
}
}