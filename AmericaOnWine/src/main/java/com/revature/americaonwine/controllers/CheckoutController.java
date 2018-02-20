package com.revature.americaonwine.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.americaonwine.beans.Transaction;
import com.revature.americaonwine.beans.User;
import com.revature.americaonwine.data.InventoryDao;
import com.revature.americaonwine.services.CheckoutService;

@RestController
@RequestMapping(headers="Accept=application/json, text/plain")
public class CheckoutController {
	@Autowired
	private CheckoutService cs;
	@Autowired
	private InventoryDao id;
	
	@RequestMapping(value="/transaction", method=RequestMethod.POST)
	public String addTransaction(@RequestBody Transaction fromWeb, ObjectMapper om, HttpSession session) throws JsonProcessingException {
		
		Transaction fromDB = cs.newTransaction(fromWeb);
		
		if(fromDB != null) {
			int num= fromWeb.getInv().getQuantity()-fromWeb.getQuantity();
			fromWeb.getInv().setQuantity(num);
			id.updateItem(fromWeb.getInv());
			return om.writeValueAsString(fromDB);
		}else {
			return null;
		}
		
	}
	
	@RequestMapping(value="/transaction", method=RequestMethod.GET)
	public String getTransaction(ObjectMapper om, HttpSession session) throws JsonProcessingException {
		User u = (User) session.getAttribute("user");
		List<Transaction> fromDB = cs.getTransactionsForUser(u);
		
		if(fromDB != null) {
			return om.writeValueAsString(fromDB);
		}else {
			return null;
		}

	}
}